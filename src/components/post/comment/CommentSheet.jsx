import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import CommentInput from './CommentInput';
import CommentsList from './CommentsList'; 
import { userProgressSliceActions } from '@/store/slices/userProgressSlice';
import {  submitComment } from '@/store/slices/commentSlice';
import CustomModal from '@/components/ui/modal/CustomModal';
// import { useSelector } from 'react-redux';


const CommentSheet = ({ postImage, postId }) => {
  const [currentPostImage, setCurrentPostImage] = useState(postImage);
 
  useEffect(() => {
    
    setCurrentPostImage(postImage);
  }, [postImage]);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const isOpen = useAppSelector(state => state.userProgress.isModalOpen);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });



  


 

  const handleSubmit = async (commentText, audioURL) => {
    if (!postId || !user?.uid || !user?.username) {
      console.error("Missing required fields");
      return;
    }

    if (!commentText.trim() && !audioURL) {
      console.error("Cannot submit empty comment");
      return;
    }

    dispatch(
      submitComment({
        postId,
        commentText,
        userId: user.uid,
        username: user.username,
        audioURL,
      })
    );
  };

  const handleClose = () => {
    dispatch(userProgressSliceActions.setModalOpen());
  };

  return (
    <>
      {isMobile ? (
        console.log("rendering mobile comment sheet"),
        <Sheet open={isOpen} onOpenChange={handleClose}>
          <SheetContent 
            side="bottom" 
            className="h-[90vh] p-0 sm:h-[85vh] rounded-t-xl border-t-0 sm:rounded-t-2xl"
          >
            <div className="flex h-full">
              <div className="flex-1 flex flex-col h-full">
                <SheetHeader className="px-4 py-3 border-b">
                  <SheetTitle>Comments</SheetTitle>
                </SheetHeader>
                <CommentsList postId={postId}   />
                <CommentInput onSubmit={handleSubmit} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        console.log("rendering desktop comment sheet"),
        <CustomModal 
          isOpen={isOpen} 
          title="Comments" 
          showHeader={true} 
          className="max-w-4xl w-full h-[90vh] flex  dark:bg-gray-900 rounded-lg overflow-hidden"
        >
          <div className="grid grid-cols-7 h-full w-full">
            {/* {console.log("Current Post Image in CommentSheet:", currentPostImage)} */}
            {currentPostImage && (
              <div className="hidden md:block col-span-3 ">
                <img 
                  src={currentPostImage} 
                  alt="Post" 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="col-span-4 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4">
                <CommentsList  postId={postId}/>
              </div>
              <div className="border-t p-4">
                <CommentInput onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default CommentSheet;