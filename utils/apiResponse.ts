import { NextResponse } from "next/server";

export const ApiResponse = {
  success(data: any, status = 200) {
    return NextResponse.json(data, { status });
  },

  error(message: string, status = 400) {
    return NextResponse.json({ message }, { status });
  },
};