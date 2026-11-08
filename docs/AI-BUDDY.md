# The student AI buddy and friend

The AI helper lives on `ai.html` (standalone page) and inside the student
dashboard. It answers from material stored in the website itself, so it works
with no paid AI service and no API key.

## Where the answers come from

| File | Holds |
| --- | --- |
| `js/ai.js` | Behaviour: which topic matches a question, exam-safety rules, feelings, friend replies, follow-up handling |
| `js/ai-knowledge.js` | School material: `window.AI_KNOWLEDGE`, one entry per topic with `keys`, `subject`, `en`, `ml` |
| `js/pages/ai.js` | The standalone page: chat panel, nickname setup, suggestion chips and the "How do you feel today?" row |

Every answer is written twice — in English and in Malayalam. Kannada readers
fall back to the English answer. Each entry ends with an exam tip.

Current coverage: 44 topics across science, maths, social science, English,
Malayalam and commerce (Classes 1 to 10 and Plus One / Plus Two Commerce).

## How a reply is chosen

1. Exam-safety guard: questions asking for live exam answers or another
   student's marks are refused.
2. If an optional AI endpoint is configured (`window.AI_CONFIG.endpoint`), it is
   tried first and the local notes are used when it fails.
3. A short follow-up such as "more", "again" or "ഇനിയും" repeats the last topic.
4. Feelings: sad, tired, angry/frustrated or happy each get a caring reply, plus
   a concrete next step and a nudge to speak to a teacher or parent when it is
   serious.
5. Friend questions ("how are you", "are you my friend", "good morning") get a
   warm reply that uses the student's nickname, their own name and the time of
   day.
6. Otherwise the best matching topic is answered; if nothing matches, the
   helper says what it does know and invites the student to name the chapter.

The nickname the student chooses is stored on their student account and is used
in every greeting and answer, so the helper feels personal.

## Safety rules kept in the code

- No answer is written for a live exam, and no other student's marks or personal
  details are ever given.
- The chat stays private to the student and their class teachers.
- The page is student-only; the role check is enforced by the database, not by
  the browser.
- Nothing is sent outside the school's own Supabase project unless a school
  administrator deliberately sets `window.AI_CONFIG.endpoint`.

## Adding material

Append an entry to `window.AI_KNOWLEDGE` in `js/ai-knowledge.js`:

```js
{
  keys: ['chapter name', 'മലയാളം വാക്ക്', 'keyword'],
  subject: 'science',
  en: 'The answer, with an exam tip.',
  ml: 'ഉത്തരം, പരീക്ഷാ നുറുങ്ങിനൊപ്പം.'
}
```

Keep it before the closing `];`, then run `npm test` — the check script parses
every script and counts all pages.
