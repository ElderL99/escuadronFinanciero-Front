import { useState, useEffect } from "react";

export default function useActiveCreditsOnMount() {
  const { fetchActiveCredits, loading, error } = useAdminCredits();
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchActiveCredits();
      if (data) setCredits(data);
    };
    load();
  }, []);

  return { credits, loading, error };
}
