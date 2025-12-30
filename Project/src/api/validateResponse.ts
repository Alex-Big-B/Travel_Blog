export const validateResponse = async (
  response: Response
): Promise<Response> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}:${errorText}`);
  }
  return response;
};
