import React from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { ActiveRoast } from '../components/ActiveRoast';
import { MOCK_ROASTS } from '../data/mockRoasts';
import { SwapDefault } from '@coinbase/onchainkit/swap';
import type { Token } from '@coinbase/onchainkit/token';

export function Dashboard() {
  const activeRoast = MOCK_ROASTS[0];

  const eth: Token = {
    name: 'ETH',
    address: '',
    symbol: 'ETH',
    decimals: 18,
    image: 'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png',
    chainId: 8453,
  };

  const usdc: Token = {
    name: 'USDC',
    address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    symbol: 'USDC',
    decimals: 6,
    image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2',
    chainId: 8453,
  };

  return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
        <AnimatedBackground />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <ActiveRoast roast={activeRoast} />
            <div className="mt-12 flex justify-center p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl">
              <SwapDefault
                from={[eth]}
                to={[usdc]}
                className="!bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}