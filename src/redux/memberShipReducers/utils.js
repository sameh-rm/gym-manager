export const membershipsToOptions = (membershipsList) => {
  const options = [];

  membershipsList.forEach((membership) =>
    options.push({ value: membership, label: membership.name })
  );
  return options;
};
