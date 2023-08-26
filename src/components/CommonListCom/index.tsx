import React, { ReactNode } from "react";
import { Card } from "antd";
import './index.less'

type CommonListProps = {
  bordered?: boolean;
  title?: string;
  className?: string;
  children?: ReactNode
}

function CommonList(props: CommonListProps) {
  const { bordered, title, className } = props

  return (
    <Card className={`common-list-container  ${className}`}
      bordered={bordered || false}
      title={<span className="list-title">{title}</span>}
    >
      {props?.children}
    </Card>)
}

export default CommonList;
