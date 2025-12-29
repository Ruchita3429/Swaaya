import { Suspense } from 'react';
import CollectionContent from './CollectionContent';

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <CollectionContent />
    </Suspense>
  );
}

