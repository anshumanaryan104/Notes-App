import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ikqhaebpntbjmlkvmbjj.supabase.co';
const SUPABASE_Anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrcWhhZWJwbnRiam1sa3ZtYmpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzcwNTYsImV4cCI6MjA3NDMxMzA1Nn0.1O_qA8NXmKweLxG6DX4412CoM4OPqZlbkaiVaIWeLlE';

const supabase = createClient(supabaseUrl, SUPABASE_Anon_key);

export default supabase;