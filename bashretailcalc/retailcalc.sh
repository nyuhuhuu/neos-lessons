#!/bin/bash

item_count=$1
price=$2
state_code=$3

if [ -z "$state_code" ] ; then
    echo "Usage: $0 <item-count> <price> <state-code>"
    exit 1
fi

discount=0
function get_discount {
    if [ $price -gt 50000 ] ; then
        discount=15
    elif [ $price -gt 10000 ] ; then
        discount=10
    elif [ $price -gt 7000 ] ; then
        discount=7
    elif [ $price -gt 5000 ] ; then
        discount=5
    elif [ $price -gt 1000 ] ; then
        discount=3
    fi
}

tax_rate=0
function get_tax_rate {
    case $state_code in
        ut|UT)
            tax_rate=6.85
            ;;
        nv|NV)
            tax_rate=8.00
            ;;
        tx|TX)
            tax_rate=6.25
            ;;
        al|AL)
            tax_rate=4.00
            ;;
        ca|CA)
            tax_rate=8.25
            ;;
    esac
}

total=$((item_count * price))
get_discount
total=$((total - (total * discount / 100)))
get_tax_rate
total=$(echo "scale=2;$total+($total*$tax_rate/100)" | bc)
echo "Total price: $"$total
echo "Discount: "$discount"%"
echo "Tax rate: "$tax_rate"%"
