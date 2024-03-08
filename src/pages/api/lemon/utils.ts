export const returnOkay = (res) => res.status(200).json({ message: "OK" });

export const returnError = (res) =>
  res.status(400).json({
    message: "Error in webhook",
  });
