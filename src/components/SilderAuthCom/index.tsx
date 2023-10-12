import React, { useCallback, useEffect, useRef } from "react";
import { IconArrowRight } from "@arco-design/web-react/icon";
import { Modal } from "antd";
import "./index.less";

interface Props {
  slicePicXAxis: number;
  slicePicYAxis: number;
  n: number;
}

// 画六边形
const getNBorderPic = (context: any, x: any, y: any, n: any, r: any) => {
  let i;
  const ang = (Math.PI * 2) / n; //旋转的角度
  context.save(); //保存状态
  context.fillStyle = "white";
  context.strokeStyle = "white";
  context.lineWidth = 3; //设置线宽

  context.translate(x, y); //原点移到x,y处，即要画的多边形中心
  context.moveTo(0, -r); //据中心r距离处画点
  context.beginPath();
  for (i = 0; i < n; i++) {
    context.rotate(ang); //旋转
    context.lineTo(0, -r); //据中心r距离处连线
  }
  context.closePath();
  context.stroke();
  context.fill();
  context.restore(); //返回原始状态
};

const AuthPicCom = (props: Props | any, ref: any) => {
  const {
    slicePicXAxis, //空白图片x坐标
    slicePicYAxis, //空白图片y坐标
    borderNums, // 图形边数
    slicePicBorderWidth = 40, // 图形边长
    picture, // 背景图片
    onSuccess, // 成功的回调
    onFail, //失败的回调
    modalClose,
  } = props;
  const containerRef = useRef<HTMLCanvasElement | any>(null);
  const yzmRef = useRef<HTMLCanvasElement | any>(null);
  const tempYzmRef = useRef<HTMLCanvasElement | any>(null);
  const scrollBarRef = useRef<any>();

  const getInit = useCallback(() => {
    const canvas = yzmRef.current;
    const tempCanvas = tempYzmRef.current;
    if (!canvas || !tempCanvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    const tempCtx = tempCanvas.getContext("2d");

    if (!ctx || !tempCtx) {
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = picture;
    img.onload = () => {
      // 根据图片大小，设置响应容器的宽高
      containerRef.current.style.width = img.width + "px";
      canvas.width = tempCanvas.width = img.width;
      canvas.height = tempCanvas.height = img.height;
      //贴上背景图片
      ctx.drawImage(img, 0, 0);
      getNBorderPic(
        ctx,
        slicePicXAxis,
        slicePicYAxis,
        borderNums,
        slicePicBorderWidth
      );
      //裁剪出多边形
      getNBorderPic(
        tempCtx,
        slicePicXAxis,
        slicePicYAxis,
        borderNums,
        slicePicBorderWidth
      );
      tempCtx.clip();
      tempCtx.drawImage(img, 0, 0);
      tempYzmRef.current.style.left =
        0 - slicePicXAxis + Math.floor(slicePicBorderWidth) + "px";
      console.log(tempYzmRef.current.offsetLeft);
    };
  }, [slicePicBorderWidth, borderNums, picture, slicePicXAxis, slicePicYAxis]);

  // 拖拽函数
  const dragBox = (e: any) => {
    // 获取鼠标、六边形、滚动条箭头的原始位置
    const initPositon = e.clientX;
    const initBoxPostion = tempYzmRef.current.offsetLeft;
    const initScrollBarPostion = scrollBarRef.current.offsetLeft;
    // 监听鼠标移动
    window.onmousemove = (element) => {
      const removedLength = element.clientX - initPositon;

      const newBoxPosition = initBoxPostion + removedLength;
      const newScrollBarPosition = initScrollBarPostion + removedLength;

      const parentWidth = scrollBarRef.current.parentElement.offsetWidth;
      const scrollBarWidth = scrollBarRef.current.offsetWidth;

      const minLeft = 0;
      const maxLeft = parentWidth - scrollBarWidth;
      // 边界处理，解决移动的时候超出边界的情况
      const clampedBoxPosition = Math.max(
        minLeft - 0 - slicePicXAxis + Math.floor(slicePicBorderWidth),
        Math.min(
          newBoxPosition,
          maxLeft - 0 - slicePicXAxis + Math.floor(slicePicBorderWidth)
        )
      );
      const clampedScrollBarPosition = Math.max(
        minLeft,
        Math.min(newScrollBarPosition, maxLeft)
      );

      tempYzmRef.current.style.left = clampedBoxPosition + "px";
      scrollBarRef.current.style.left = clampedScrollBarPosition + "px";
    };

    window.onmouseup = () => {
      window.onmousemove = null;
      console.log(tempYzmRef.current.style.left);
      if (
        Number(tempYzmRef.current.style.left.replace("px", "")) >= -10 &&
        Number(tempYzmRef.current.style.left.replace("px", "")) <= 10
      ) {
        onSuccess();
      } else {
        tempYzmRef.current.style.left =
          0 - slicePicXAxis + Math.floor(slicePicBorderWidth) + "px";
        scrollBarRef.current.style.left = 0 + "px";
        onFail();
      }
    };
  };

  useEffect(() => {
    getInit();
  }, [getInit]);

  return (
    <Modal
      className="yzm-modal"
      open={true}
      footer={null}
      onCancel={() => modalClose()}
    >
      <div ref={containerRef} className="yzm-container">
        <canvas ref={yzmRef} className="static-yzm" id="yzm"></canvas>
        <canvas className="move-yzm" ref={tempYzmRef} id="yzm2"></canvas>
        <div className="scroll-bar">
          <div
            ref={scrollBarRef}
            className="scroll-block"
            onMouseDown={(e) => dragBox(e)}
          >
            <IconArrowRight className="scroll-icon" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthPicCom;
