export async function graphql(query: string, variables = {}) {
  const endpoint = "/api/graphql"

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`)
    }

    const result = await response.json()

    if (result.errors && result.errors.length > 0) {
      console.error("GraphQL errors:", result.errors)
    }

    return {
      data: result.data || {},
      errors: result.errors,
    }
  } catch (error) {
    console.error("GraphQL request error:", error)
    return {
      data: {},
      errors: [{ message: error instanceof Error ? error.message : "Unknown error" }],
    }
  }
}

