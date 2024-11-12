import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const useRouterWithSession = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Retrieve existing route change history from cookies, or initialize an empty array
      const routeHistory = Cookies.get('routeHistory')
        ? JSON.parse(Cookies.get('routeHistory'))
        : [];

      // Create a new log entry
      const newEntry = {
        level: "info",
        message: `redirect to route ${url}`,
        date: new Date().toISOString(),
      };

      routeHistory.push(newEntry);

      // Save the updated route history back to the cookies as a JSON string
      Cookies.set('routeHistory', JSON.stringify(routeHistory), {
        sameSite: 'lax', // Try with 'lax' instead of 'strict'
        secure: true,    // Ensure secure cookie setting if you're on HTTPS
      });

      console.log("Updated routeHistory saved to cookies:", routeHistory); // Debug log
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return router;
};

export default useRouterWithSession;
