import { HedgehogBust, MoleBust, MonkeyBust, RabbitBust, SquirrelBust } from './components/busts';
import { HedgehogFace, MoleFace, MonkeyFace, RabbitFace, SquirrelFace } from './components/faces';

const characters = {
  1: {
    name: '더지씨',
    description: '차분하고 듬직한,\n속 깊고 따뜻한 비밀 상담사',
    color: '#AC7C76',
    face: MoleFace,
    bust: MoleBust,
    lottie: require('@/assets/lotties/mole.json'),
  },
  2: {
    name: '토끼씨',
    description: '날렵하고 유능한,\n쿨하고 시원시원한 만능 해결사',
    color: '#FFEAEA',
    face: RabbitFace,
    bust: RabbitBust,
    lottie: require('@/assets/lotties/rabbit.json'),
  },
  3: {
    name: '람쥐씨',
    description: '작고 하찮은,\n엉뚱하고 앙증맞은 귀여운 수집가',
    color: '#AD5600',
    face: SquirrelFace,
    bust: SquirrelBust,
    lottie: require('@/assets/lotties/squirrel.json'),
  },
  4: {
    name: '숭이씨',
    description: '다정하고 활기찬,\n맛집에 진심인 유쾌한 미식가',
    color: '#E9D7C8',
    face: MonkeyFace,
    bust: MonkeyBust,
    lottie: require('@/assets/lotties/monkey.json'),
  },
  5: {
    name: '도치씨',
    description: '솔직하고 거침없는,\n화끈하게 편들어주는 대변인',
    color: '#DB8B3C',
    face: HedgehogFace,
    bust: HedgehogBust,
    lottie: require('@/assets/lotties/hedgehog.json'),
  },
};

export default characters;
