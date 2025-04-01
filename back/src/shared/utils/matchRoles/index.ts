export function matchRoles(allowRoles: string[], userRoles: string[]) {
  // console.log(allowRoles, userRoles);
  if (!allowRoles || allowRoles.length === 0) {
    return true;
  }

  if (!userRoles || userRoles.length === 0) {
    return false;
  }

  let canAccess = false;

  for (const userRole of userRoles) {
    if (allowRoles.indexOf(userRole) > -1) {
      canAccess = true;
    }
  }
  // console.log('Allow Access:', canAccess);
  return canAccess;
}
