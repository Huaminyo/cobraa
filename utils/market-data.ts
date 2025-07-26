export interface PriceData {
  bitcoin: { usd: number }
  ethereum: { usd: number }
}

export interface GasData {
  standard: number
  fast: number
  instant: number
}

export async function fetchCoinGeckoPrice(): Promise<PriceData | null> {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd")

    if (!response.ok) {
      throw new Error("Failed to fetch price data")
    }

    return await response.json()
  } catch (error) {
    console.error("CoinGecko API Error:", error)
    return null
  }
}

export function simulateGasData(): GasData {
  // Simulate BASE network gas prices (in gwei)
  const baseGas = Math.random() * 0.5 + 0.1 // 0.1-0.6 gwei for BASE
  return {
    standard: Math.round(baseGas * 100) / 100,
    fast: Math.round(baseGas * 1.2 * 100) / 100,
    instant: Math.round(baseGas * 1.5 * 100) / 100,
  }
}

export function simulateCobraPrice() {
  // Simulate COBRA price with some volatility
  const basePrice = 0.0087
  const volatility = (Math.random() - 0.5) * 0.002 // ±0.001 variation
  return {
    price: Math.round((basePrice + volatility) * 10000) / 10000,
    change24h: Math.round((Math.random() - 0.3) * 200 * 100) / 100, // Bias toward positive
    volume24h: Math.round((2.1 + (Math.random() - 0.5) * 0.5) * 100) / 100,
  }
}
