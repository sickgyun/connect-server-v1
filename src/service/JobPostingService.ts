import { load } from 'cheerio';
import axios from 'axios';

type JobPosting = {
  title: string;
  imageUrl?: string;
  companyName: string;
  detailLink: string;
};

export const getJobList = async () => {
  const response = await axios.get(
    'https://www.rallit.com/?jobGroup=DEVELOPER&jobLevel=JUNIOR,BEGINNER,INTERN&pageNumber=1'
  );
  const $ = load(response.data);
  let jobPostingList: JobPosting[] = [];

  $('.css-mao678 > li').each((index, item) => {
    if (index < 6) {
      const title = $(item).find('.summary__title').text();
      const imageUrl = $(item).find('img').attr('src');
      const companyName = $(item).find('.summary__company-name').text();
      const detailLink = 'https://www.rallit.com/' + $(item).find('a').attr('href');

      jobPostingList.push({ title, imageUrl, companyName, detailLink });
    }
  });

  return { message: '성공', dataList: jobPostingList };
};
