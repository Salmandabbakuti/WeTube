// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Video extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("title", Value.fromString(""));
    this.set("thumbnailHash", Value.fromString(""));
    this.set("videoHash", Value.fromString(""));
    this.set("owner", Value.fromBytes(Bytes.empty()));
    this.set("createdAt", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Video entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Video must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Video", id.toString(), this);
    }
  }

  static load(id: string): Video | null {
    return changetype<Video | null>(store.get("Video", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }

  get category(): string | null {
    let value = this.get("category");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set category(value: string | null) {
    if (!value) {
      this.unset("category");
    } else {
      this.set("category", Value.fromString(<string>value));
    }
  }

  get location(): string | null {
    let value = this.get("location");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set location(value: string | null) {
    if (!value) {
      this.unset("location");
    } else {
      this.set("location", Value.fromString(<string>value));
    }
  }

  get thumbnailHash(): string {
    let value = this.get("thumbnailHash");
    return value!.toString();
  }

  set thumbnailHash(value: string) {
    this.set("thumbnailHash", Value.fromString(value));
  }

  get videoHash(): string {
    let value = this.get("videoHash");
    return value!.toString();
  }

  set videoHash(value: string) {
    this.set("videoHash", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}
