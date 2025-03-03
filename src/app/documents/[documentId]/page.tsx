import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import { Room } from "./room";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed left-0 top-0 right-0 z-10 bg-[#fafbfd] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0 ">
        <Room>
          <Editor />
        </Room>
      </div>
    </div>
  );
};

export default DocumentIdPage;
