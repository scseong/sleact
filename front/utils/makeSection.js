import dayjs from 'dayjs';

export default function makeSection(chatList) {
  const sections = {};
  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createAt).format('YYYY-MM-DD');
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
}
