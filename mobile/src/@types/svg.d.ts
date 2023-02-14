// Quando tivermos uma importação de qualquer arquivo .svg dala que ele e um componente
declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
  }