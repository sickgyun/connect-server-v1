import { load } from 'cheerio';
import axios from 'axios';

type Job = {
  title: string;
  image?: string;
  company: string;
  link: string;
};

export const getJumpitJobList = async () => {
  const response = await axios.get('https://www.jumpit.co.kr/');
  const $ = load(response.data);
  let jobList: Job[] = [];

  $('.sc-917d8d6a-3 > .sc-c8169e0e-0').each((index, item) => {
    if (index < 4) {
      const title = $(item).find('.position_card_info_title').text();
      const image = $(item).find('img').attr('src');
      const company = $(item).find('.sc-2525ae7a-2 > span').text();
      const link =
        'https://www.jumpit.co.kr' + $(item).find('.sc-c8169e0e-0 > a').attr('href');

      jobList.push({ title, image, company, link });
    }
  });

  return { message: '성공', dataList: jobList };
};

export const getRallitJobList = async () => {
  const response = await axios.get(
    'https://www.rallit.com/?jobGroup=DEVELOPER&jobLevel=JUNIOR,BEGINNER,INTERN&pageNumber=1'
  );
  const $ = load(response.data);
  let jobList: Job[] = [];

  $('.css-mao678 > li').each((index, item) => {
    if (index < 4) {
      const title = $(item).find('.summary__title').text();
      const image = $(item).find('img').attr('src');
      const company = $(item).find('.summary__company-name').text();
      const link = 'https://www.rallit.com/' + $(item).find('a').attr('href');

      jobList.push({ title, image, company, link });
    }
  });

  return { message: '성공', dataList: jobList };
};
