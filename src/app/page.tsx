'use client'
import { useState } from 'react';
import Image from "next/image";
import data from '@/app/data.json'
import Switch from "@mui/material/Switch";
import Dropdown from "@/app/components/dropdown";
import SearchForm from "./components/Search";

const label = { inputProps: { "aria-label": "Switch demo" } };



interface File {
  name: string;
  type: "file";
  size: string;
  modificationDate?:string;
}

interface Folder {
  name: string;
  type: "folder";
  children: (File | Folder)[];
  modificationDate?:string;

}

interface RootFolder {
  root: Folder;
}

export default function Home() {
  const [currentFolder, setCurrentFolder] = useState<Folder>(data.root as Folder);
  const [pathStack, setPathStack] = useState<Folder[]>([]);

  console.log('✌️currentFolder --->', currentFolder);

  const handleFolderClick = (folder: Folder): void => {
    console.log('✌️folder --->', folder);
    setPathStack(prevStack => [...prevStack, folder]);
    setCurrentFolder(folder);
  };

  const handleBreadcrumbClick = (index: number): void => {
    const newPathStack = pathStack.slice(0, index);
    const newCurrentFolder = newPathStack.length > 0 ? newPathStack[newPathStack.length - 1] : data.root;
    setPathStack(newPathStack);
    setCurrentFolder(newCurrentFolder as Folder);
  };

  const renderBreadcrumb = (): JSX.Element => {
    return (
      <div className="flex gap-2 p-2 text-gray-800">
        <button onClick={() => handleBreadcrumbClick(0)}>Root~ </button>
        {pathStack.map((folder, index) => (
          <button key={index} onClick={() => handleBreadcrumbClick(index + 1)}>~{folder.name}</button>
        ))}
      </div>
    );
  };

  const renderFolders = (folder: Folder) => {
    if (!folder.children) return null;
  
    return folder.children.map((item, index) => {
      console.log('✌️item --->', item);
  
      if (item.type === 'file') {
        const fileItem = item as File;
        return (
          <div key={index} className="grid grid-cols-4 p-4 ml-2 text-gray-600 cursor-pointer">
            <div className="flex gap-3 items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              {fileItem.name}
            </div>
            <div>{fileItem.size}</div>
            <div>{fileItem.type}</div>
            <div>{fileItem.modificationDate || "-"}</div>
          </div>
        );
      } else {
        const folderItem = item as Folder;
        return (
          <div key={index} className="grid grid-cols-4 p-4 ml-2 text-gray-600 cursor-pointer" onClick={() => handleFolderClick(folderItem)}>
            <div className="flex gap-3 items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>
              {folderItem.name}
            </div>
            <div>-</div>
            <div>{folderItem.type}</div>
            <div>{folderItem.modificationDate || "-"}</div>
          </div>
        );
      }
    });
  };
  

  return (
    <>
      <div className="h-screen grid grid-rows-[10%, 10%, 10%, 60%, 10%, 10%]">
        <div className="h-[6vh] p-3 mt-2 text-gray-600">Root directory</div>
        <hr />
        <div className="h-[10vh] flex">
          <div className="flex items-center p-4 justify-between gap-10 text-gray-600 w-full ">
            <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
</svg>

              Keep Local Path
            </div>
            <div className="flex p1">
              <Switch {...label} defaultChecked sx={{ marginTop: -1 }} />
              Auto Sync
            </div>
            <div className="mb-3">
              <Dropdown value1={15} value2={25} value3={30}/>
            </div>
            <div className="p1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </div>
            <div className="flex items-center flex-grow justify-end ">
              <SearchForm />
            </div>
          </div>
        </div>
        <hr />
        <div className="h-[7vh]">
          {renderBreadcrumb()}
        </div>
        <hr />
        <div className="h-[7vh]">
          <div className="grid grid-cols-4  p-4">
            <div>Name</div>
            <div>Size</div>
            <div>Type</div>
            <div>Modification Date</div>
          </div>
        </div>
        <hr />
        <div className="h-[60vh]">
          {renderFolders(currentFolder)}
          <hr />
        </div>
        <div className="flex justify-between h-[6vh]">
          <div className='flex'>

        <Switch {...label} defaultChecked sx={{ marginTop: -1 }} />
            Delete Padding
          </div>
          <div className='flex'>
            <div className='flex items-center gap-5 text-gray-600'>
            <span>
                Row Per page
              </span>
              <Dropdown value1={5} value2={25} value3={30} />
              <span className='ml-2 mr-2'>
                1-2 of 2
              </span>
            </div>
          </div>

        </div>
        <hr />
        <div className="h-[6vh] p-2 text-gray-600">
            Selected 0 sence file
        </div>
      </div>
    </>
  );
}
