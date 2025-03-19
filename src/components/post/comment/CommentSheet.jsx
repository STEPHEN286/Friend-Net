import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAppSelector } from '@/store/hooks';
import CommentInput from './CommentInput';
import CommentsList from './CommentsList';
import { addComment, getComments } from '@/services/postServices'; 
  

const CommentSheet = ({ postImage, postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useAppSelector(state => state.auth);

  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        setIsLoading(true);
        try {
          const fetchedComments = await getComments(postId);
          setComments(fetchedComments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (commentText) => {
    if (!user.id || !user.userName) {
      console.error('User information is required to comment');
      return;
    }

    try {
      await addComment(postId, commentText, user.id, user.userName);
      const updatedComments = await getComments(postId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button 
          className="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-gray-700"
          data-sheet-trigger
        >
          <i className="far fa-comment"></i>
          <span>{comments.length}</span>
        </button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-[90vh] p-0 sm:h-[85vh] rounded-t-xl border-t-0 sm:rounded-t-2xl"
      >
        <div className="flex h-full">
          {/* Left side - Post Image (hidden on mobile) */}
          <div className="hidden sm:block w-1/2 bg-black">
            {postImage && (
              <img 
                src={postImage} 
                alt="Post" 
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Right side - Comments */}
          <div className="flex-1 flex flex-col h-full">
            <SheetHeader className="px-4 py-3 border-b">
              <SheetTitle>Comments</SheetTitle>
            </SheetHeader>

            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <span className="text-gray-500">Loading comments...</span>
              </div>
            ) : (
              <CommentsList comments={comments} />
            )}
            <CommentInput 
              onSubmit={handleSubmit}
              userImage={user.profilePic}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet; 