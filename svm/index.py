import pandas as pd
import numpy as np
from sklearn import svm
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

dataset1=pd.read_excel('./data.xlsx')
# print(dataset1.iloc[1, 1])
# for i in range(np.shape(dataset1)[0]):
#     lei=dataset1.iloc[i,-1]
#     lei=lei.split('_')[1]
#     dataset1.iloc[i,-1]=float(lei)
target=np.array(dataset1[0])  #类标签
dataset=np.array(dataset1.iloc[:,1:])   #数据集
target=np.array([target[i] for i in range(len(target))])


#导入SVC函数，分割数据集

svr = svm.SVC()
parameters = {'C':[0.001,0.003,0.006,0.009,0.01,0.04,0.08,0.1],
              'kernel':('linear','rbf',), 
              'gamma':[0.001,0.005,0.1,0.15,0.20,0.23,0.27],
              'decision_function_shape':['ovo','ovr'],
              'class_weight':[{1:7,2:1.83,3:3.17}],
             }
X_train, X_test, y_train, y_test=train_test_split(dataset,target,test_size=.4,random_state=1)

print(len(y_train), len(y_test))
#GridSearchCV，sklearn的自动调优函数
clf = GridSearchCV(svr, parameters)
clf.fit(X_train, y_train)

#使用a储存调优后的参数结果
# a=pd.DataFrame(clf.cv_results_[])

# #按照mean_test_score降序排列
# a.sort(['mean_test_score'],ascending=False)

#输出最好的分类器参数，以及测试集的平均分类正确率
clf.best_estimator_,clf.best_score_
print(clf.best_estimator_, clf.best_score_)
print('训练集准确率', accuracy_score(y_train, clf.predict(X_train)))
print('测试集准确率', accuracy_score(y_test, clf.predict(X_test)))