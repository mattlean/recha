/* eslint-disable import/prefer-default-export */
export const todoIsChecked = (completed_at: string): boolean => {
  if (completed_at) return true
  return false
}
