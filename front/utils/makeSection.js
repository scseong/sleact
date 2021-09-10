import dayjs from 'dayjs';

export default function makeSection(chatList) {
  const sections = {};
  chatList.forEach((chat) => {
    const month = dayjs(chat.createAt).format('YYYY-MM-DD');
    if (Array.isArray(section[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthData] = [chat];
    }
  });
  return sections;
}
