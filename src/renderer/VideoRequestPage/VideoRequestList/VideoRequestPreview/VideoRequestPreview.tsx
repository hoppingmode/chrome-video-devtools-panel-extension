import { TExtensionStorageVideo } from "@shared";

export function VideoRequestPreview(props: TExtensionStorageVideo) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>
        <a href={props.url} target="_blank" rel="noreferrer">
          {props.name}
        </a>
      </p>
    </div>
  );
}
