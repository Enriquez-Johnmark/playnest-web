export type Child = { id: string; name: string; dob: string; color: string };
export type Activity = { id: string; name: string; ages: [number, number]; minutes: number; price: number; instructor: string; location: string; image: string; description: string };
export type Session = { id: string; activityId: string; start: string; capacity: number; seeded: number; status: "scheduled" | "full" | "cancelled" };
export type Booking = { id: string; reference: string; activityId: string; childId: string; sessionId: string; createdAt: string; submissionId: string };

export const children: Child[] = [
  { id: "emma", name: "Emma", dob: "2021-04-16", color: "#d3f2ef" },
  { id: "lucas", name: "Lucas", dob: "2023-01-22", color: "#fdf1d0" },
];
export const activities: Activity[] = [
  { id: "toddler-time", name: "Toddler Time", ages: [1, 3], minutes: 45, price: 35000, instructor: "Mia Santos", location: "Studio A", image: "/images/playnest/6ae560728aed.jpg", description: "Gentle movement, music, and sensory play for little explorers." },
  { id: "little-explorers", name: "Little Explorers", ages: [3, 5], minutes: 45, price: 40000, instructor: "Ava Reyes", location: "Studio B", image: "/images/playnest/cfe838ad5277.jpg", description: "Movement, balance, coordination, and playful challenges." },
  { id: "junior-gymnastics", name: "Junior Gymnastics", ages: [5, 8], minutes: 45, price: 45000, instructor: "Noah Cruz", location: "Studio A", image: "/images/playnest/ef30bb111be1.jpg", description: "A confident, supportive introduction to gymnastics fundamentals." },
  { id: "open-play", name: "Open Play", ages: [2, 10], minutes: 90, price: 30000, instructor: "PlayNest team", location: "Central Play Loft", image: "/images/playnest/a690886a06c6.jpg", description: "Flexible supervised play in our welcoming activity space." },
];
const base = new Date(); base.setDate(base.getDate() + 7); base.setHours(9, 0, 0, 0);
const at = (day: number, hour: number, minute = 0) => { const d = new Date(base); d.setDate(d.getDate() + day); d.setHours(hour, minute); return d.toISOString(); };
export const sessions: Session[] = [
  { id: "tt-1", activityId: "toddler-time", start: at(0, 9), capacity: 8, seeded: 4, status: "scheduled" },
  { id: "le-1", activityId: "little-explorers", start: at(0, 10, 10), capacity: 8, seeded: 6, status: "scheduled" },
  { id: "jg-full", activityId: "junior-gymnastics", start: at(0, 16), capacity: 8, seeded: 8, status: "full" },
  { id: "jg-2", activityId: "junior-gymnastics", start: at(2, 16), capacity: 8, seeded: 5, status: "scheduled" },
  { id: "op-1", activityId: "open-play", start: at(1, 14), capacity: 12, seeded: 7, status: "scheduled" },
];
const key = "playnest-web-demo-v1";
export const money = (amount: number) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(amount / 100);
export const dateTime = (value: string) => new Intl.DateTimeFormat("en-PH", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
export const ageOf = (dob: string) => { const now = new Date(); const d = new Date(dob); return now.getFullYear() - d.getFullYear() - Number(now < new Date(now.getFullYear(), d.getMonth(), d.getDate())); };
export const eligible = (child: Child, activity: Activity) => { const age = ageOf(child.dob); return age >= activity.ages[0] && age <= activity.ages[1]; };
export const remaining = (session: Session, bookings: Booking[]) => session.capacity - session.seeded - bookings.filter(b => b.sessionId === session.id).length;
export const loadBookings = (): Booking[] => { try { const parsed: unknown = JSON.parse(localStorage.getItem(key) || "[]"); if (!Array.isArray(parsed)) throw new Error("Saved booking data is invalid."); return parsed as Booking[]; } catch { throw new Error("Saved bookings are unavailable in this browser. Please enable browser storage and try again."); } };
export const saveBookings = (bookings: Booking[]) => { try { localStorage.setItem(key, JSON.stringify(bookings)); } catch { throw new Error("We could not save this booking in your browser. Please enable browser storage and try again."); } };
export function createBooking(input: Omit<Booking, "id" | "reference" | "createdAt">) {
  const existing = loadBookings();
  const activity = activities.find(x => x.id === input.activityId); const child = children.find(x => x.id === input.childId); const session = sessions.find(x => x.id === input.sessionId);
  if (!activity || !child || !session || session.activityId !== activity.id) throw new Error("That booking choice is no longer available.");
  if (!eligible(child, activity)) throw new Error(`${child.name} is not within this activity’s age range.`);
  if (session.status !== "scheduled" || remaining(session, existing) < 1) throw new Error("This session has just filled. Please choose another time.");
  const duplicate = existing.find(x => x.submissionId === input.submissionId || (x.childId === child.id && x.sessionId === session.id));
  if (duplicate) return duplicate;
  const booking = { ...input, id: crypto.randomUUID(), reference: `PN-${Math.random().toString(36).slice(2, 7).toUpperCase()}`, createdAt: new Date().toISOString() };
  saveBookings([...existing, booking]); return booking;
}
