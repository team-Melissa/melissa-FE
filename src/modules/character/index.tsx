import { HedgehogBust, MoleBust, MonkeyBust, RabbitBust, SquirrelBust } from './components/busts';
import { HedgehogFace, MoleFace, MonkeyFace, RabbitFace, SquirrelFace } from './components/faces';

const characters = {
  1: {
    name: '더지씨',
    color: '#AC7C76',
    face: <MoleFace />,
    bust: <MoleBust />,
    lottie: require('@/assets/lotties/mole.json'),
  },
  2: {
    name: '토끼씨',
    color: '#FFEAEA',
    face: <RabbitFace />,
    bust: <RabbitBust />,
    lottie: require('@/assets/lotties/rabbit.json'),
  },
  3: {
    name: '람쥐씨',
    color: '#AD5600',
    face: <SquirrelFace />,
    bust: <SquirrelBust />,
    lottie: require('@/assets/lotties/squirrel.json'),
  },
  4: {
    name: '숭이씨',
    color: '#E9D7C8',
    face: <MonkeyFace />,
    bust: <MonkeyBust />,
    lottie: require('@/assets/lotties/monkey.json'),
  },
  5: {
    name: '도치씨',
    color: '#DB8B3C',
    face: <HedgehogFace />,
    bust: <HedgehogBust />,
    lottie: require('@/assets/lotties/hedgehog.json'),
  },
};

export default characters;
