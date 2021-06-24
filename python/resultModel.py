from collections import deque

class ResultWords:

    # 查询文件中是否有想要查的词
    def getWord(self, word):
        with open("../python/result.txt", 'r') as f:
            txtword = f.read().split("\n")
            for x in txtword:
                if word in x:
                    return word
        f.close()
        print(txtword)
        return "none"

    # def addWord(self, wordToAdd):
    #     self.resultWords.append(wordToAdd)
    #     print(self.resultWords)

    def deleteWord(self, word):
        with open("../python/result.txt", 'r') as f:
            txtword = f.read().split("\n")
            for x in txtword:
                if word in x:
                    txtword.remove(x)
                    break

        f.close()
        print(txtword)
        with open("../python/result.txt", 'w') as f:
            for x in txtword:
                f.write(x)
        f.close()



        # if len(self.resultWords) != 0:
        #     self.resultWords.remove(word)



        # if len(self.resultWords) != 0:
        #     count = 0
        #     for i in range(len(self.resultWords)):
        #         if count == 1:
        #             break
        #         if self.resultWords[i] == word:
        #             del self.resultWords[i]
        #             count = 1



# 全局类实例
globalResultWords = ResultWords()
