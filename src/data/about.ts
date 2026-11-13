/**
 * Personal facts that move with the calendar.
 *
 * The age and the years of full-time dedication are derived here instead of
 * typed into the copy, so the About section updates itself every year: the
 * birthday is 22 January 2000 and the full-time practice started in 2022.
 */

export const BIRTH_YEAR = 2000
export const BIRTH_MONTH = 1
export const BIRTH_DAY = 22

/** First year dedicated to the therapies full time. */
export const CAREER_START_YEAR = 2022

/** Whole years lived at `now`; the birthday counts as turned on the same day. */
export function ageOn(now: Date): number {
  const currentMonth = now.getMonth() + 1
  const birthdayPassed =
    currentMonth > BIRTH_MONTH ||
    (currentMonth === BIRTH_MONTH && now.getDate() >= BIRTH_DAY)

  return now.getFullYear() - BIRTH_YEAR - (birthdayPassed ? 0 : 1)
}

/** Whole years dedicated full time, counted by calendar year. */
export function yearsOfPracticeOn(now: Date): number {
  return now.getFullYear() - CAREER_START_YEAR
}