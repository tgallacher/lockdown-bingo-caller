import React, { useReducer, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro'; // eslint-disable-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';
import Theme from '../components/theme';

const Wrapper = styled.div`
  ${tw`flex flex-col items-center justify-start h-screen w-screen`};
  ${tw`px-2 xl:px-0`}
`;

const Heading = tw.h1`
  text-2xl text-gray-500 uppercase mt-2 lg:mt-5
`;

const Text = tw.p`
  text-xl text-gray-800 mb-2
`;

interface State {
  left: number[];
  called: number[];
}

const initReducer = (maxNumber: string): State => {
  return {
    left: Array.from(new Array(parseInt(maxNumber, 10)).keys()).map((x) => x + 1),
    called: []
  };
};

const reducer = (state: State, action: { type: string; payload?: string }): State => {
  switch (action.type) {
    case 'CALL': {
      const picked = state.left.sort(() => Math.random() - 0.5).shift();
      if (!picked) return state;

      return {
        left: state.left,
        called: state.called.concat(picked)
      };
    }
    case 'NEW_GAME': {
      const newState = initReducer(action.payload || '90');
      return newState;
    }

    default:
      return state;
  }
};

const CTASection = styled.section`
  ${tw`my-10 w-full text-center`};
`;

const CalledNumbersSection = styled.section`
  ${tw`bg-gray-300 p-4 border-solid border-gray-400`};
  ${tw`w-screen max-w-5xl`};
  border-width: 1px;
`;

const ButtonCss = tw`p-2 bg-purple-600 rounded inline-block text-white outline-none focus:outline-none hover:outline-none`;

const IndexPage = () => {
  const [maxNumber, setMaxNumber] = useState<string>('90');
  const [hasMaxNumChangedMidGame, setHasMaxNumChangedMidGame] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, maxNumber, initReducer);

  return (
    <Theme>
      <Wrapper>
        <header css={tw`mb-8 grid lg:grid-cols-2 lg:justify-between w-full max-w-5xl items-center`}>
          <Heading>Call 'yer Bingo</Heading>

          <div css={tw`text-center lg:text-right`}>
            <label htmlFor="max-bingo-number">Max number</label>
            <input
              css={[
                tw`inline-block text-right px-2 py-2 border-solid border-gray-300 mx-2 bg-gray-200`,
                css`
                  border-width: 1px;
                `
              ]}
              id="max-bingo-number"
              size={3}
              type="text"
              onChange={(e) => {
                setMaxNumber(e.target.value);

                if (state.called.length === 0) {
                  dispatch({ type: 'NEW_GAME', payload: e.target.value });
                } else {
                  setHasMaxNumChangedMidGame(true);
                }
              }}
              value={maxNumber}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              css={[ButtonCss, tw`text-gray-800 bg-gray-400 col-start-3`]}
              onClick={() => {
                setHasMaxNumChangedMidGame(false);
                dispatch({ type: 'NEW_GAME', payload: maxNumber });
              }}
            >
              New game
            </motion.button>
            {hasMaxNumChangedMidGame && (
              <small css={tw`block italic`}>
                New number range will take effect in the next game
              </small>
            )}
          </div>
        </header>

        <main css={[tw`flex flex-col items-center justify-start`]}>
          <CTASection>
            <motion.button
              css={[ButtonCss]}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'CALL' })}
            >
              Call next number
            </motion.button>
          </CTASection>

          <CalledNumbersSection>
            <Text>Called numbers ({state.called.length})</Text>
            <div css={tw`grid grid-cols-5 lg:grid-cols-10 gap-10 text-center`}>
              {state.called.map((number) => (
                <div key={number}>
                  <p css={tw`font-semibold text-lg`}>{number}</p>
                </div>
              ))}
            </div>
          </CalledNumbersSection>
        </main>
      </Wrapper>
    </Theme>
  );
};

export default IndexPage;
