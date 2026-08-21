export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      success: false,
      error: "Missing Supabase environment variables",
    });
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/rpc/keep_alive`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      const error = await response.text();

      return res.status(response.status).json({
        success: false,
        error,
      });
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      result: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
