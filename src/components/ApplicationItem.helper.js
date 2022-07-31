const TRANS_TYPES = {
  1: "AUTH",
  2: "COMMIT",
  3: "REFUND",
};

export const transactionsCombined = (cards, transactions) => transactions.map((t) => {
  const combined = {
    ...t,
    ...cards.find((c) => c.id === t.cardId),
  };

  return (({ cardNo, issuer, amount, transType }) => ({
    cardNo,
    issuer,
    amount,
    transType: TRANS_TYPES[transType],
  }))(combined)
});