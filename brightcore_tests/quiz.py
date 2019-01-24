from cryptography.fernet import Fernet

key = 'TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM='

# Oh no! The code is going over the edge! What are you going to do?
message = b'''gAAAAABcRhDman1NtUXXWhDlqVBVbcN3sY-2cNj8aNp6gG0z3nOvk-dr-
qAPbvLJDSTqIBAbASOwfbMhTwMNwKeBoO6R7NO4V2tO7vNN1VR1Cb8sBs5LL9W4BXvM1nqW50odQznB1eR-hX60MTBCYhGymVzcS2k_2Xwj8iW4unEegAnG8
-lytL32NTE8Z2AOCAhJ3enPJ-9U'''

def main():
    f = Fernet(key)
    print(f.decrypt(message))


if __name__ == "__main__":
    main()