// LIBRARIES
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY

  // "https://sogpldhbiuwhpnpcwzih.supabase.co",
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZ3BsZGhiaXV3aHBucGN3emloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2ODU3NzAsImV4cCI6MjA1MDI2MTc3MH0.D55qSkEoMEFgbjDlkl6-pUqMIFKlSCORSjDQu6VWK6E"
);
