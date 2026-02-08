'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// We initialize safely to prevent the "required" crash
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null

export default function WhaleTicker() {
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    if (!supabase) return

    // 1. Fetch initial data
    const fetchWhales = async () => {
      const { data, error } = await supabase
        .from('whale_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (error) {
        console.error('Fetch error:', error)
      } else if (data) {
        setAlerts(data)
      }
    }

    fetchWhales()

    // 2. Real-time Subscription (This makes it "Live")
    const channel = supabase
      .channel('whale_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'whale_alerts' },
        (payload) => {
          setAlerts((current) => [payload.new, ...current].slice(0, 5))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="p-4 bg-black border border-[#D4AF37]/20 rounded-xl font-mono h-full flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
          Network Pulse: Active
        </span>
      </div>
      
      <div className="space-y-3">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 group">
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold">{alert.sol_amount.toLocaleString()} SOL</span>
                <span className="text-[9px] text-zinc-500 truncate w-24">TX: {alert.signature.slice(0,8)}...</span>
              </div>
              <div className="text-right">
                <span className="text-[#D4AF37] text-xs font-black block">
                  ${alert.usd_value > 0 ? alert.usd_value.toLocaleString() : "---"}
                </span>
                <span className="text-[9px] text-zinc-600 uppercase">Captured</span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-4 text-center">
            <p className="text-[10px] text-zinc-500 italic animate-pulse">
              Listening for Whale signatures...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}