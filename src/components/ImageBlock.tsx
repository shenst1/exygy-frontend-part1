import { Badge } from "./Badge"
import "./ImageBlock.scss"

export interface ImageBlockProps {
  deadline: string
  imageURL: string
  labels: string[]
}

// We have provided an implementation of the image block component as a starting point
// You are free to use this component or build your own
export const ImageBlock = (props: ImageBlockProps) => {
  return (
    <div className="image-block">
      {props.labels.length > 0 && (
        <div className={"label-container"}>
          {props.labels.map((label, index) => {
            return <Badge key={index} variation="callout">{label}</Badge>
          })}
        </div>
      )}
      <img src={props.imageURL} alt={""} />
      <div className={"deadline"}>{`Application Deadline: ${props.deadline}`}</div>
    </div>
  )
}
