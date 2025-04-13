import {
  RealtimeChannel,
  RealtimePresenceState,
  SupabaseClient,
  RealtimePresenceJoinPayload,
  RealtimePresenceLeavePayload,
} from '@supabase/supabase-js'
import SupabaseService from './supabase.service'
import { Database } from '../database.types'

export type PresenceInfo = {
  user_id: string
  online_at: string
  // Add other relevant user info if needed, e.g., username
}

type PresenceListeners = {
  onSync: (newState: RealtimePresenceState<PresenceInfo>) => void
}

class PresenceService {
  private client: SupabaseClient<Database>
  private channel: RealtimeChannel | null = null
  private static readonly CHANNEL_NAME = 'online-users'

  constructor() {
    this.client = SupabaseService.client
  }

  initializeTracking(userId: string, onSync: (newState: RealtimePresenceState<PresenceInfo>) => void): void {
    if (this.channel) {
      console.warn('Presence tracking already initialized.')
      return
    }

    this.channel = this.client.channel(PresenceService.CHANNEL_NAME)

    this.channel.on('presence', { event: 'sync' }, () => {
      const newState = this.channel!.presenceState<PresenceInfo>()
      onSync(newState)
    })

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        try {
          // Track is async but we don't need to await it here in the callback
          await this.channel!.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          })
        } catch (error) {
          console.error('Error tracking presence:', error)
        }
      } else if (status === 'CHANNEL_ERROR') {
        console.error('Presence channel error')
        // Optionally attempt to resubscribe or notify user
      } else if (status === 'TIMED_OUT') {
        console.warn('Presence channel timed out')
        // Optionally attempt to resubscribe
      }
    })
  }

  async cleanupTracking(): Promise<void> {
    if (this.channel) {
      try {
        await this.channel.unsubscribe()
      } catch (error) {
        console.error('Error during presence cleanup:', error)
      } finally {
        this.channel = null
      }
    }
  }

  getPresenceState(): RealtimePresenceState<PresenceInfo> | null {
    return this.channel ? this.channel.presenceState<PresenceInfo>() : null
  }
}

// Export a singleton instance
export default new PresenceService()
