#!/bin/bash

# 定义基础目录路径
base_dir="/Users/guoying/zhenmuwang/zmw-chachamucaishang"

# 定义一个数组，包含我们要查找的文件和目录名
declare -a items=("pinia/add" "components/Comment" "components/Complaint" "components/Question" "components/FileUpload.vue" "components/Textarea.vue")

# 定义一个函数来打印文件和目录结构及内容
print_tree_and_content() {
    local path="$1"  # 从函数调用中获取的路径

    # 检查路径是否是文件
    if [[ -f "$path" ]]; then
        # 打印文件路径
        echo "===== FILE: $path ====="
        # 打印文件内容
        cat "$path"
        echo -e "\n"  # 打印新行以分隔输出

    # 检查路径是否是目录
    elif [[ -d "$path" ]]; then
        # 打印目录结构
        tree "$path"

        # 查找目录中的所有文件
        local sub_items=$(find "$path" -type f)
        # 遍历每个文件
        for sub_item in $sub_items; do
            echo "===== FILE: $sub_item ====="
            cat "$sub_item"
            echo -e "\n"  # 打印新行以分隔输出
        done
    fi
}

# 遍历items数组中的每个项目
for item in "${items[@]}"; do
    # 调用函数打印目录结构和内容
    print_tree_and_content "$base_dir/$item"
done
