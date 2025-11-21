import { useRef, useEffect } from 'react';

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const SECTION_LIST_MOCK_DATA = [
    {
      title: 'Appetizers',
      data: [
        {
          id: '1',
          title: 'Pasta',
          price: '10',
        },
        {
          id: '3',
          title: 'Pizza',
          price: '8',
        },
      ],
    },
    {
      title: 'Salads',
      data: [
        {
          id: '2',
          title: 'Caesar',
          price: '2',
        },
        {
          id: '4',
          title: 'Greek',
          price: '3',
        },
      ],
    },
  ];

export function getSectionListData(data) {
  const titlesSet = new Set();
  data.forEach(item => {
    titlesSet.add(item.category);
  });

  const titles = Array.from(titlesSet);
  let newDataArray = [];

  const newDataObject = () => titles.forEach(title => {
    let obj = {
      title: title,
      data: []
    }
    newDataArray.push(obj);
  });
  newDataObject();

    data.forEach(item => {
      if(titles.filter(title => title == item.category)) {
        const newItemObj = {
          id: item.id,
          title: item.title,
          price: item.price
        };

        newDataArray.forEach(data => {
          if(data.title == item.category) {
            data.data.push(newItemObj);
          }
        });
      };
    });
  return newDataArray;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
