export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Chat API is healthy',
    timestamp: new Date().toISOString()
  });
};
