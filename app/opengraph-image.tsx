import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CV Dating - Meet Beyond the Swipe'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0E0A1A',
          backgroundImage: 'radial-gradient(circle at 50% 20%, #3b1d6e 0%, #0E0A1A 80%)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90px',
            height: '90px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
            fontSize: '44px',
            fontWeight: 800,
            marginBottom: '30px',
            boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)',
          }}
        >
          CV
        </div>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          CV Dating
        </div>
        <div
          style={{
            fontSize: '32px',
            color: '#c4b5fd',
            marginBottom: '32px',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          Meet Beyond The Swipe. Intention-First Connection.
        </div>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            fontSize: '20px',
            color: '#e9d5ff',
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '999px' }}>
            ❤️ Serious Dating
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '999px' }}>
            🗣️ Language Exchange
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '999px' }}>
            🤝 Adult Friendship
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
