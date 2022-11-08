import {useEffect, useState} from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const apiMockData = [
  {
    isAvailable: true,
    name: '00-未派車',
    isCheck: false,
    id: 1,
  },
  {
    isAvailable: false,
    name: '00-未派車',
    isCheck: false,
    id: 2,
  },
  {
    isAvailable: true,
    name: '00-未派車',
    isCheck: false,
    id: 3,
  },
  {
    isAvailable: true,
    name: '00-未派車',
    isCheck: false,
    id: 4,
  },
  {
    isAvailable: true,
    name: '00-未派車',
    isCheck: false,
    id: 5,
  },
  {
    isAvailable: true,
    name: '00-未派車',
    isCheck: false,
    id: 6,
  },
  {
    isAvailable: true,
    name: '00-未派車',
    isCheck: false,
    id: 7,
  },
  {
    isAvailable: true,
    name: '00-未派車',
    isCheck: false,
    id: 8,
  },
  {
    isAvailable: false,
    name: '00-未派車',
    isCheck: false,
    id: 9,
  },
  {
    isAvailable: true,
    name: '00-未派車',
    isCheck: false,
    id: 10,
  },
  {
    isAvailable: true,
    name: '00-未派車',
    isCheck: false,
    id: 11,
  },
  {
    isAvailable: false,
    name: '00-未派車',
    isCheck: false,
    id: 12,
  },
  {
    isAvailable: true,
    name: '00-未派車',
    isCheck: false,
    id: 13,
  },
]

const getList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({data: apiMockData}), 1000)
  })
}

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-weight: bold;
`
const StyledContentBox = styled.div`
  display: inline-block;
  border: 3px solid #777;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, .02);
`
const StyledRow = styled.div`
  display: flex;
  padding: 7px 20px;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid #999;
  }

  &:first-child {
    background-color: #bcdede;
    border-radius: 7px 7px 0 0;
  }

  h3 {
    color: #1269a8;
  }
`
const StyledInputBox = styled.div`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  input {
    width: 20px;
    height: 20px;
  }
`
const StyledSpace = styled.div`
  width: 15px;
`
const StyledLabel = styled.label`
  user-select: none;
`

function App() {
  const [dataList, setDataList] = useState([]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const handleAll = (event) => {
    const isChecked = event.target.checked;
    setDataList((prevState) => {
      return prevState.map((element) => {
        if (element.isAvailable) {
          return {
            ...element,
            isCheck: isChecked,
          };
        } else {
          return element;
        }
      });
    });
    setIsCheckAll(isChecked);
  }
  useEffect(() => {
    let isAllSelect = true;
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].isAvailable && !dataList[i].isCheck) {
        isAllSelect = false;
        break;
      }
    }
    if (isAllSelect) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  }, [dataList])

  const [prevCheckIndex, setPrevCheckIndex] = useState(0)
  const handleClick = (event, elementID, currentIndex) => {
    const isShiftKey = event.shiftKey;
    if (isShiftKey) {
      setDataList((prevState) => {
        const newState = _.cloneDeep(prevState)
        const startIndex = currentIndex < prevCheckIndex ? currentIndex : prevCheckIndex;
        const endIndex = currentIndex < prevCheckIndex ? prevCheckIndex : currentIndex;
        const action = event.target.checked;
        for (let i = startIndex; i <= endIndex; i++) {
          if (newState[i].isAvailable) {
            newState[i].isCheck = action;
          }
        }
        return newState;
      })
    } else {
      setDataList((prevState) => {
        const newState = _.cloneDeep(prevState);
        if (newState[currentIndex].isAvailable) {
          newState[currentIndex].isCheck = !newState[currentIndex].isCheck;
        }
        return newState;
      })
    }
    setPrevCheckIndex(currentIndex);
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await getList();
      setDataList(result.data);
    }
    if (dataList.length === 0) {
      fetchData();
    }
  }, [])

  return (
    <StyledWrapper className="App">
      <StyledContentBox>
        <StyledRow>
          <StyledInputBox>
            <input
              type="checkbox"
              onClick={(event) => handleAll(event)}
              checked={isCheckAll}
              readOnly
            />
          </StyledInputBox>
          <StyledSpace />
          <h3>狀態</h3>
        </StyledRow>
        {dataList.length > 0 && dataList.map((element, index) => (
          <StyledRow key={element.id}>
            <StyledInputBox>
              {element.isAvailable && (
                <input
                  type="checkbox"
                  onClick={(event) => (handleClick(event, element.id, index))}
                  checked={element.isCheck}
                  readOnly
                  id={`CC${element.id}`}
                />
              )}
            </StyledInputBox>
            <StyledSpace />
            <StyledLabel for={`CC${element.id}`}>
              {element.name}
            </StyledLabel>
          </StyledRow>
        ))}
      </StyledContentBox>
    </StyledWrapper>
  );
}

export default App;
