import { load } from 'cheerio';
import axios from 'axios';

type JobPosting = {
  title: string;
  image?: string;
  company: string;
  link: string;
};

export const getRallitJobList = async () => {
  const response = await axios.get(
    'https://www.rallit.com/?jobGroup=DEVELOPER&jobLevel=JUNIOR,BEGINNER,INTERN&pageNumber=1'
  );
  const $ = load(response.data);
  let jobPostingList: JobPosting[] = [];

  $('.css-mao678 > li').each((index, item) => {
    if (index < 4) {
      const title = $(item).find('.summary__title').text();
      const image = $(item).find('img').attr('src');
      const company = $(item).find('.summary__company-name').text();
      const link = 'https://www.rallit.com/' + $(item).find('a').attr('href');

      jobPostingList.push({ title, image, company, link });
    }
  });

  return { message: '성공', dataList: jobPostingList };
};
