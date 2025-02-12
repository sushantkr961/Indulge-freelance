import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { colors } from "../Utils/Constant/Colors"

const ImageContentLoader = (props: any) => (
    <ContentLoader
        speed={2}
        width={'100%'}
        height={200}
        viewBox="0 0 400 200"
        backgroundColor={colors.GREY_FONT_COLOR}
        foregroundColor="#ecebeb"
        {...props}
    >
        {/* <Circle cx="31" cy="31" r="15" /> */}
        {/* <Rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> */}
        {/* <Rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> */}
        <Rect rx="5" ry="5" width="400" height="100%" />
    </ContentLoader>
)

export default ImageContentLoader