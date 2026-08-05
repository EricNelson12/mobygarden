function parseEventTime(value) {
	if (!value) return null;

	const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
	if (!match) return null;

	let hours = Number.parseInt(match[1], 10);
	const minutes = Number.parseInt(match[2], 10);
	const meridiem = match[3].toLowerCase();

	if (meridiem === 'pm' && hours < 12) {
		hours += 12;
	}
	if (meridiem === 'am' && hours === 12) {
		hours = 0;
	}

	return { hours, minutes };
}

function normalizeDate(eventDate) {
	if (eventDate instanceof Date) {
		return eventDate;
	}

	if (typeof eventDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
		const [year, month, day] = eventDate.split('-').map(Number);
		return new Date(year, month - 1, day);
	}

	return new Date(eventDate);
}

export function shouldShowUpcoming(eventDate, eventTime, now = new Date()) {
	if (!eventDate) {
		return false;
	}

	const parsedDate = normalizeDate(eventDate);
	if (Number.isNaN(parsedDate.getTime())) {
		return false;
	}

	if (!eventTime) {
		return parsedDate.getTime() > now.getTime();
	}

	const parsedTime = parseEventTime(eventTime);
	if (!parsedTime) {
		return parsedDate.getTime() > now.getTime();
	}

	const eventDateTime = new Date(parsedDate);
	eventDateTime.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
	return eventDateTime.getTime() > now.getTime();
}
