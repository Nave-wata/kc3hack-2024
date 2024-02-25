import { Head } from "../Head/Head";
import Background from "../../assets/images/Background/background.png";
import { Box } from "@mui/material";
 
type MainLayoutProps = {
    title: string;
    head?: React.ReactNode;
    children: React.ReactNode;
};

const setWinSize = () => {
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  return `${Background}?w=${windowSize.width}&h=${windowSize.height}`;
};

const image = {
  backgroundImage: `url(${setWinSize()})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',  // 画像の繰り返しを無効にする
  backgroundPosition: 'center',
  minHeight: '100vh',
  minWidth: '100vw',
  justifyContent: "space-between",
};
 
export const MainLayout = ({ title, head, children }: MainLayoutProps) => (
    <>
        <Head title={title}>
            {head}
        </Head>
        <Box sx={image}>
          {children}
        </Box>
    </>
);
