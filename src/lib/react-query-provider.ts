// // src/providers/ReactQueryProvider.tsx
// 'use client';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactNode, useState } from 'react';

// type Props = { children: ReactNode };

// export function ReactQueryProvider({ children }: Props) {
//   const [client] = useState(() => new QueryClient());

//   return (
//     <QueryClientProvider client={client}>
//       {children}
//     </QueryClientProvider>
//   );
// }
