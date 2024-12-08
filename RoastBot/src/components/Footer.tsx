import React from 'react';
import { IdentityCard } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';

export function Footer() {
  return (
    <footer className="absolute bottom-4 text-center w-full text-sm opacity-60">
      <div className="mb-4">
        © 2024 BlameFlame. All rights reserved. Use at your own risk of ego damage.
      </div>
      <div className="flex justify-center">
        <IdentityCard
          address="0xFF65DC5C653c2A6C7C11986b06E5f45D5Ba88076"
          chain={base}
          schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
        />
      </div>
    </footer>
  );
}